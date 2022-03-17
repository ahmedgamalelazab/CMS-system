import {Injectable} from "@angular/core";
import {ScriptStore} from "./script.store";

declare var document: any;

@Injectable()
export class ScriptService {

private scripts: any = {}; //script state container

constructor() {
  //cashing code // fix it by provide it within the component that asking for those scripts only
    ScriptStore.forEach((script: any) => {
      //mapping scripts state
        this.scripts[script.name] = {
            loaded: false,
            src: script.src
        };

    });
}

//caller
load(...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises); //hard lazy load
}

//scripts engine
loadScript(name: string) {
    return new Promise((resolve, reject) => {
        //resolve if already loaded
        //check each script name passed state
        if (this.scripts[name].loaded) {
          //this script will never work if u provided within the component scope
            resolve({script: name, loaded: true, status: 'Already Loaded'});
        }
        else {
            //load script
            let script = document.createElement('script'); //dynamic element of type script
            script.type = 'text/javascript';
            script.src = this.scripts[name].src;
            if (script.readyState) {  //IE
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        this.scripts[name].loaded = true;
                        resolve({script: name, loaded: true, status: 'Loaded'});
                    }
                };
            } else {  //Others
                script.onload = () => {
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                };
            }
            script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
            document.getElementsByTagName('body')[0].appendChild(script);
        }
    });
}

}
