const canvas = document.getElementById('webgl-canvas');
const gl = canvas.getContext('webgl');

// Definisi koordinat titik-titik untuk membentuk segi 10
const vertices = [

  0.0, 0.5,
  0.5, 0.0,
  0.224, -0.309,
  0.0, -0.5,
  -0.224, -0.309,
  -0.5, 0.0,
  0.0, 0.5,
  0.0, 0.309,
  0.224, 0.0,
  0.0, -0.309,
  -0.224, 0.0,
  0.0, 0.309
];

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

const vertexShaderCode = `
  attribute vec2 coordinates;
  void main(void) {
    gl_Position = vec4(coordinates, 0.0, 1.0);
    gl_PointSize = 5.0;
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderCode);
gl.compileShader(vertexShader);

const fragmentShaderCode = `
  void main(void) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderCode);
gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

const coord = gl.getAttribLocation(shaderProgram, 'coordinates');
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
