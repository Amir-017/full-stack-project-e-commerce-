export class httpError extends Error {
  constructor(status, mss) {
    super(mss);
    this.status = status;
  }
}

// export const HTTPError =(status, message)=>{
//     let error = new Error(message);
//     error.status = status;
//     return error;
// }
