export namespace Types {
  export type Data = {
    x: number;
    y: number;
  };
  export type Dimensions = {
    width: number;
    height: number;
    margin: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    boundedWidth: number;
    boundedHeight: number;
  };
}
