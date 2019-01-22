import Xray from 'x-ray';

export class Scraper {

  get(url : string, data : any) : Promise<any> {

    return new Promise<string>((resolve, reject) => {
      let xray = Xray();

      xray(url, data)((error, result) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(result);
        }
      });
    });

  }
}