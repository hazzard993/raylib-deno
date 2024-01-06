export class Vector2 {
  constructor(public x: number, public y: number) {}

  static fromBuffer(buffer: ArrayBuffer) {
    const view = new DataView(buffer);
    return new Vector2(view.getFloat32(0), view.getFloat32(4));
  }

  get buffer() {
    return new Float32Array([this.x, this.y]).buffer;
  }
}

export class Vector3 {
  constructor(public x: number, public y: number, public z: number) {}

  static fromBuffer(buffer: ArrayBuffer) {
    const view = new DataView(buffer);
    return new Vector3(
      view.getFloat32(0),
      view.getFloat32(4),
      view.getFloat32(8),
    );
  }

  get buffer() {
    return new Float32Array([this.x, this.y, this.z]).buffer;
  }
}

export class Vector4 {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w: number,
  ) {}

  static fromBuffer(buffer: ArrayBuffer) {
    const view = new DataView(buffer);
    return new Vector4(
      view.getFloat32(0),
      view.getFloat32(4),
      view.getFloat32(8),
      view.getFloat32(12),
    );
  }

  get buffer() {
    return new Float32Array([this.x, this.y, this.z, this.w]).buffer;
  }
}

export class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
  ) {}

  static fromBuffer(buffer: ArrayBuffer) {
    const view = new DataView(buffer);
    return new Rectangle(
      view.getFloat32(0),
      view.getFloat32(4),
      view.getFloat32(8),
      view.getFloat32(12),
    );
  }

  get buffer() {
    return new Float32Array([this.x, this.y, this.width, this.height]).buffer;
  }
}

export class Camera2D {
  /** Camera offset (displacement from target) */
  offset: Vector2;
  /** Camera target (rotation and zoom origin) */
  target: Vector2;
  /** Camera rotation in degrees */
  rotation: number;
  /** Camera zoom (scaling), 1.0f by default */
  zoom: number;

  constructor(
    options?: {
      /** Camera offset (displacement from target) */
      offset?: Vector2;
      /** Camera target (rotation and zoom origin) */
      target?: Vector2;
      /** Camera rotation in degrees */
      rotation?: number;
      /** Camera zoom (scaling), 1.0f by default */
      zoom?: number;
    },
  ) {
    this.offset = options?.offset ?? new Vector2(0, 0);
    this.target = options?.target ?? new Vector2(0, 0);
    this.rotation = options?.rotation ?? 0;
    this.zoom = options?.zoom ?? 1;
  }

  get buffer() {
    return new Float32Array([
      this.offset.x,
      this.offset.y,
      this.target.x,
      this.target.y,
      this.rotation,
      this.zoom,
    ]).buffer;
  }
}

export class Camera3D {
  position: Vector3;
  target: Vector3;
  up: Vector3;
  fovY: number;
  type: "PERSPECTIVE" | "ORTHOGRAPHIC";
  constructor(
    options?: {
      /** Camera position */
      position?: Vector3;
      /** Camera target (what it looks at) */
      target?: Vector3;
      /** Camera up vector (rotation over its axis) */
      up?: Vector3;
      /** Camera field-of-view apperture in Y (degrees) */
      fovY?: number;
      /** Camera type, defines projection type */
      type?: "PERSPECTIVE" | "ORTHOGRAPHIC";
    },
  ) {
    this.position = options?.position ?? new Vector3(0, 0, 0);
    this.target = options?.target ?? new Vector3(0, 1, 0);
    this.up = options?.up ?? new Vector3(0, 0, 1);
    this.fovY = options?.fovY ?? 90;
    this.type = options?.type ?? "PERSPECTIVE";
  }

  get buffer() {
    const view = new DataView(new ArrayBuffer(44));
    view.setFloat32(0, this.position.x);
    view.setFloat32(4, this.position.y);
    view.setFloat32(8, this.position.z);
    view.setFloat32(12, this.target.x);
    view.setFloat32(16, this.target.y);
    view.setFloat32(20, this.target.z);
    view.setFloat32(24, this.up.x);
    view.setFloat32(28, this.up.y);
    view.setFloat32(32, this.up.z);
    view.setFloat32(36, this.fovY);
    view.setUint8(40, this.type === "PERSPECTIVE" ? 0 : 1);

    return view.buffer;
  }
}
