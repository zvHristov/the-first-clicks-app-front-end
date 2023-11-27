import { domain } from 'process';
import {HotspotsType} from '../store/types';


export const deepMerge = (...objects: any[]) => {
    const isObject = (obj: any) => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
        if (obj) {
            Object.keys(obj).forEach(key => {
                const pVal = prev[key];
                const oVal = obj[key];

                if (Array.isArray(pVal) && Array.isArray(oVal)) {
                    prev[key] = pVal.concat(...oVal);
                }
                else if (isObject(pVal) && isObject(oVal)) {
                    prev[key] = deepMerge(pVal, oVal);
                }
                else {
                    prev[key] = oVal;
                }
            });
        }

        return prev;
    }, {});
};

export const detectMobile = (): boolean => {
    const nav = navigator.userAgent;
    return /android/i.test(nav) ||
        /ipad/i.test(nav) ||
        /iphone/i.test(nav) ||
        /ipod/i.test(nav) ||
        /blackberry/i.test(nav) ||
        /windows phone/i.test(nav) ||
        /webos/i.test(nav);
};

export const handleErrors = (res: any, allowedStatusCodes: number[] = []) => {
    if (allowedStatusCodes.indexOf(res.status) >= 0 || res.ok) {
        return res;
    }
    throw new Error(`${res.status}: ${res.statusText}`);
};

export const replaceHtml = (data):string => {
    // ancer://
  /// console.log(data,'magic fun');
    const root  = document.createElement('root');
    root.innerHTML = data && data.processed.html;
    const anchors  = root.querySelectorAll('a');
    root.querySelector('div div div')
        .setAttribute('style',
            'border-radius: 4px 4px 0 0;' +


            'background-size:cover;' +
            'background-blend-mode: multiply;') ;
    root.querySelector('div div div').setAttribute('id','divBody');

    //console.log(divBody, 'divBody');
    ////a ->
    anchors.forEach(el => el.setAttribute('target', '_blank'));

    return root.innerHTML;
}

export const setLocalStorageItem = (key: string, val: any) => {
    localStorage.setItem(key, JSON.stringify(val));
};

export const getLocalStorageItem = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

export const removeLocalStorageItem = (key: string) => {
    localStorage.removeItem(key);
};

export const getHostname = (url: string): string => {
    // use URL constructor and return hostname
    return new URL(url).hostname;
}

export const normalizeNameProject = (projects: any[]): any[] => {
/// TODO... all logic to be edit about project
    let normalizNameGrpups: any[] = [];
    
        if(projects.length) {
            for (let i = 0; i < projects.length; i++) {
                const name = projects[i].domain && getHostname(projects[i].domain);
                if(projects[i].id === projects[i].parentId) {
                   
                    if(i === 0 ){
                        normalizNameGrpups.push({activeSettings: false, showModalSnipped: false, expanded: true, name: name})
                    } else {
                        normalizNameGrpups.push({activeSettings: false, showModalSnipped: false, expanded: false, name: name});
                    }
                    
                } else {
                    normalizNameGrpups.push({activeSettings: false, showModalSnipped: false, expanded: true, name: name}) ///TODO.. domain get
                }
               
              }
        }

    return normalizNameGrpups;
    
}

export const normalizeProjects = (projects: any[]): any[] => {

let normalizGrpups: any[] = [];

    if(projects.length) {
        for (let i = 0; i < projects.length; i++) {
            if(projects[i].parentId === null){
                Object.assign(projects[i], {'parentId': projects[i].id});
    
                let nullParentProject = projects.filter(prj => prj.parentId === projects[i].parentId);
                    normalizGrpups.push(nullParentProject);
            } else {
                if(projects[i].id === projects[i].parentId) {
                    let parentProject = projects.filter(prj => prj.parentId === projects[i].parentId);
                    normalizGrpups.push(parentProject);
                } 

            }
      
          }
    }

return normalizGrpups;

}

export const getLastPatnToNumber = (pathname: string): number => {
    //last path from url
    const lastPath = pathname.lastIndexOf('/');

    return Number(pathname.substring(lastPath).slice(1));
}

export const formatDatetime = (date: Date, format: string) => {
    const locale = navigator.language;
  
    const padStart = (value: number, length: number = 2): string => value.toString().padStart(length, '0');
    return format.replace(/yyyy/g, date.getFullYear().toString())
        .replace(/dd/g, padStart(date.getDate()))
        .replace(/d/g, date.getDate().toString())
        .replace(/MMMM/g, date.toLocaleString(locale, {month: "long"}))
        .replace(/MMM/g, date.toLocaleString(locale, {month: "short"}))
        .replace(/MM/g, padStart(date.getMonth() + 1))
        .replace(/M/g, (date.getMonth() + 1).toString())
        .replace(/hh/g, padStart(date.getHours()))
        .replace(/h/g, (date.getHours()).toString())
        .replace(/mm/g, padStart(date.getMinutes()))
        .replace(/m/g, (date.getMinutes()).toString())
        .replace(/ss/g, padStart(date.getSeconds()))
        .replace(/s/g, (date.getSeconds()).toString());
};


export const getHotToCoolColorGradient = (percent: number, hotspots: HotspotsType[]): string => {
    const maxPercentile = hotspots.reduce(
        (max, hotspots) => (hotspots.percentile > max ? hotspots.percentile : max),
        hotspots[0].percentile
      );
    const minPercentile = hotspots.reduce(
        (min, hotspots) => (hotspots.percentile < min ? hotspots.percentile : min),
        hotspots[0].percentile
      );

    const colorsHot = [211,6,55,1];
    const colorsCool = [109,86,201,1];
    const colorMixC = (((colorsHot[0] + colorsCool[0]) / 2) + (colorsCool[0] / percent));
    const colorMixM = (((colorsHot[1] + colorsCool[1]) / 2) + (colorsCool[1] / percent));
    const colorMixY = (((colorsHot[2] + colorsCool[2]) / 2) + (colorsCool[2] / percent));
    const colorMixK = ((colorsHot[3] + colorsCool[3]) / 2 );
  
    const colorCMYK = maxPercentile === percent ? colorsHot : minPercentile === percent ? colorsCool : 
    [colorMixC, colorMixM, colorMixY, colorMixK];
   
    return `rgba(${colorCMYK})`;
}

export const validEmail = (email: string): any => {
    const regExEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const match: any = regExEmail.exec(email);
   
    if (!match) return undefined;
  
    return match;
};

export const validPassword = (password: string): any => {
    const regExPass = /^.*(?=.{6,20})(?=.*\d)(?=.*[a-z])(?=.*[@#$%&!-_]).*$/;
    const match: any = regExPass.exec(password);
    if (!match) return undefined;

    return match;
}

const readUploadedFile =  async (inputFile) => {
    const reader = new FileReader();
  
    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      reader.onload = () => {
        resolve(reader.result);
      };
    //   console.log(inputFile, 'async inputFile')
      reader.readAsText(inputFile);
    });
  };
  export const readUploadedFileAsText =  Object.freeze({
    readUploadedFile
  });

//// more info https://dmitripavlutin.com/controlled-inputs-using-react-hooks/
export function debounce<Params extends any[]>(func: (...args: Params) => any, timeout: number): (...args: Params) => void {
    let timer;
    return (...args: Params) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}

export const getFlags = (code: string):string => {

    if(code === 'AD') return '🇦🇩';
    if(code === 'AE') return '🇦🇪';
    if(code === 'AF') return '🇦🇫';
    if(code === 'AG') return '🇦🇬';
    if(code === 'AI') return '🇦🇮';
    if(code === 'AL') return '🇦🇱';
    if(code === 'AM') return '🇦🇲';
    if(code === 'AO') return '🇦🇴';
    if(code === 'AQ') return '🇦🇶';
    if(code === 'AR') return '🇦🇷';
    if(code === 'AS') return '🇦🇸';
    if(code === 'AT') return '🇦🇹';
    if(code === 'AU') return '🇦🇺';
    if(code === 'AW') return '🇦🇼';
    if(code === 'AX') return '🇦🇽';
    if(code === 'AZ') return '🇦🇿';
    if(code === 'BA') return '🇧🇦';
    if(code === 'BB') return '🇧🇧';
    if(code === 'BD') return '🇧🇩';
    if(code === 'BE') return '🇧🇪';
    if(code === 'BF') return '🇧🇫';
    if(code === 'BG') return '🇧🇬';
    if(code === 'BH') return '🇧🇭';
    if(code === 'BI') return '🇧🇮';
    if(code === 'BJ') return '🇧🇯';
    if(code === 'BL') return '🇧🇱';
    if(code === 'BM') return '🇧🇲';
    if(code === 'BN') return '🇧🇳';
    if(code === 'BO') return '🇧🇴';
    if(code === 'BQ') return '🇧🇶';
    if(code === 'BR') return '🇧🇷';
    if(code === 'BS') return '🇧🇸';
    if(code === 'BT') return '🇧🇹';
    if(code === 'BV') return '🇧🇻';
    if(code === 'BW') return '🇧🇼';
    if(code === 'BY') return '🇧🇾';
    if(code === 'BZ') return '🇧🇿';
    if(code === 'CA') return '🇨🇦';
    if(code === 'CC') return '🇨🇨';
    if(code === 'CD') return '🇨🇩';
    if(code === 'CF') return '🇨🇫';
    if(code === 'CG') return '🇨🇬';
    if(code === 'CH') return '🇨🇭';
    if(code === 'CI') return '🇨🇮';
    if(code === 'CK') return '🇨🇰';
    if(code === 'CL') return '🇨🇱';
    if(code === 'CM') return '🇨🇲';
    if(code === 'CN') return '🇨🇳';
    if(code === 'CO') return '🇨🇴';
    if(code === 'CR') return '🇨🇷';
    if(code === 'CU') return '🇨🇺';
    if(code === 'CV') return '🇨🇻';
    if(code === 'CW') return '🇨🇼';
    if(code === 'CX') return '🇨🇽';
    if(code === 'CY') return '🇨🇾';
    if(code === 'CZ') return '🇨🇿';
    if(code === 'DE') return '🇩🇪';
    if(code === 'DJ') return '🇩🇯';
    if(code === 'DK') return '🇩🇰';
    if(code === 'DM') return '🇩🇲';
    if(code === 'DO') return '🇩🇴';
    if(code === 'DZ') return '🇩🇿';
    if(code === 'EC') return '🇪🇨';
    if(code === 'EE') return '🇪🇪';
    if(code === 'EG') return '🇪🇬';
    if(code === 'EH') return '🇪🇭';
    if(code === 'ER') return '🇪🇷';
    if(code === 'ES') return '🇪🇸';
    if(code === 'ET') return '🇪🇹';
    if(code === 'FI') return '🇫🇮';
    if(code === 'FJ') return '🇫🇯';
    if(code === 'FK') return '🇫🇰';
    if(code === 'FM') return '🇫🇲';
    if(code === 'FO') return '🇫🇴';
    if(code === 'FR') return '🇫🇷';
    if(code === 'GA') return '🇬🇦';
    if(code === 'GB') return '🇬🇧';
    if(code === 'GD') return '🇬🇩';
    if(code === 'GE') return '🇬🇪';
    if(code === 'GF') return '🇬🇫';
    if(code === 'GG') return '🇬🇬';
    if(code === 'GH') return '🇬🇭';
    if(code === 'GI') return '🇬🇮';
    if(code === 'GL') return '🇬🇱';
    if(code === 'GM') return '🇬🇲';
    if(code === 'GN') return '🇬🇳';
    if(code === 'GP') return '🇬🇵';
    if(code === 'GQ') return '🇬🇶';
    if(code === 'GR') return '🇬🇷';
    if(code === 'GS') return '🇬🇸';
    if(code === 'GT') return '🇬🇹';
    if(code === 'GU') return '🇬🇺';
    if(code === 'GW') return '🇬🇼';
    if(code === 'GY') return '🇬🇾';
    if(code === 'HK') return '🇭🇰';
    if(code === 'HM') return '🇭🇲';
    if(code === 'HN') return '🇭🇳';
    if(code === 'HR') return '🇭🇷';
    if(code === 'HT') return '🇭🇹';
    if(code === 'HU') return '🇭🇺';
    if(code === 'ID') return '🇮🇩';
    if(code === 'IE') return '🇮🇪';
    if(code === 'IL') return '🇮🇱';
    if(code === 'IM') return '🇮🇲';
    if(code === 'IN') return '🇮🇳';
    if(code === 'IO') return '🇮🇴';
    if(code === 'IQ') return '🇮🇶';
    if(code === 'IR') return '🇮🇷';
    if(code === 'IS') return '🇮🇸';
    if(code === 'IT') return '🇮🇹';
    if(code === 'JE') return '🇯🇪';
    if(code === 'JM') return '🇯🇲';
    if(code === 'JO') return '🇯🇴';
    if(code === 'JP') return '🇯🇵';
    if(code === 'KE') return '🇰🇪';
    if(code === 'KG') return '🇰🇬';
    if(code === 'KH') return '🇰🇭';
    if(code === 'KI') return '🇰🇮';
    if(code === 'KM') return '🇰🇲';
    if(code === 'KN') return '🇰🇳';
    if(code === 'KP') return '🇰🇵';
    if(code === 'KR') return '🇰🇷';
    if(code === 'KW') return '🇰🇼';
    if(code === 'KY') return '🇰🇾';
    if(code === 'KZ') return '🇰🇿';
    if(code === 'LA') return '🇱🇦';
    if(code === 'LB') return '🇱🇧';
    if(code === 'LC') return '🇱🇨';
    if(code === 'LI') return '🇱🇮';
    if(code === 'LK') return '🇱🇰';
    if(code === 'LR') return '🇱🇷';
    if(code === 'LS') return '🇱🇸';
    if(code === 'LT') return '🇱🇹';
    if(code === 'LU') return '🇱🇺';
    if(code === 'LV') return '🇱🇻';
    if(code === 'LY') return '🇱🇾';
    if(code === 'MA') return '🇲🇦';
    if(code === 'MC') return '🇲🇨';
    if(code === 'MD') return '🇲🇩';
    if(code === 'ME') return '🇲🇪';
    if(code === 'MF') return '🇲🇫';
    if(code === 'MG') return '🇲🇬';
    if(code === 'MH') return '🇲🇭';
    if(code === 'MK') return '🇲🇰';
    if(code === 'ML') return '🇲🇱';
    if(code === 'MM') return '🇲🇲';
    if(code === 'MN') return '🇲🇳';
    if(code === 'MO') return '🇲🇴';
    if(code === 'MP') return '🇲🇵';
    if(code === 'MQ') return '🇲🇶';
    if(code === 'MR') return '🇲🇷';
    if(code === 'MS') return '🇲🇸';
    if(code === 'MT') return '🇲🇹';
    if(code === 'MU') return '🇲🇺';
    if(code === 'MV') return '🇲🇻';
    if(code === 'MW') return '🇲🇼';
    if(code === 'MX') return '🇲🇽';
    if(code === 'MY') return '🇲🇾';
    if(code === 'MZ') return '🇲🇿';
    if(code === 'NA') return '🇳🇦';
    if(code === 'NC') return '🇳🇨';
    if(code === 'NE') return '🇳🇪';
    if(code === 'NF') return '🇳🇫';
    if(code === 'NG') return '🇳🇬';
    if(code === 'NI') return '🇳🇮';
    if(code === 'NL') return '🇳🇱';
    if(code === 'NO') return '🇳🇴';
    if(code === 'NP') return '🇳🇵';
    if(code === 'NR') return '🇳🇷';
    if(code === 'NU') return '🇳🇺';
    if(code === 'NZ') return '🇳🇿';
    if(code === 'OM') return '🇴🇲';
    if(code === 'PA') return '🇵🇦';
    if(code === 'PE') return '🇵🇪';
    if(code === 'PF') return '🇵🇫';
    if(code === 'PG') return '🇵🇬';
    if(code === 'PH') return '🇵🇭';
    if(code === 'PK') return '🇵🇰';
    if(code === 'PL') return '🇵🇱';
    if(code === 'PM') return '🇵🇲';
    if(code === 'PN') return '🇵🇳';
    if(code === 'PR') return '🇵🇷';
    if(code === 'PS') return '🇵🇸';
    if(code === 'PT') return '🇵🇹';
    if(code === 'PW') return '🇵🇼';
    if(code === 'PY') return '🇵🇾';
    if(code === 'QA') return '🇶🇦';
    if(code === 'RE') return '🇷🇪';
    if(code === 'RO') return '🇷🇴';
    if(code === 'RS') return '🇷🇸';
    if(code === 'RU') return '🇷🇺';
    if(code === 'RW') return '🇷🇼';
    if(code === 'SA') return '🇸🇦';
    if(code === 'SB') return '🇸🇧';
    if(code === 'SC') return '🇸🇨';
    if(code === 'SD') return '🇸🇩';
    if(code === 'SE') return '🇸🇪';
    if(code === 'SG') return '🇸🇬';
    if(code === 'SH') return '🇸🇭';
    if(code === 'SI') return '🇸🇮';
    if(code === 'SJ') return '🇸🇯';
    if(code === 'SK') return '🇸🇰';
    if(code === 'SL') return '🇸🇱';
    if(code === 'SM') return '🇸🇲';
    if(code === 'SN') return '🇸🇳';
    if(code === 'SO') return '🇸🇴';
    if(code === 'SR') return '🇸🇷';
    if(code === 'SS') return '🇸🇸';
    if(code === 'ST') return '🇸🇹';
    if(code === 'SV') return '🇸🇻';
    if(code === 'SX') return '🇸🇽';
    if(code === 'SY') return '🇸🇾';
    if(code === 'SZ') return '🇸🇿';
    if(code === 'TC') return '🇹🇨';
    if(code === 'TD') return '🇹🇩';
    if(code === 'TF') return '🇹🇫';
    if(code === 'TG') return '🇹🇬';
    if(code === 'TH') return '🇹🇭';
    if(code === 'TJ') return '🇹🇯';
    if(code === 'TK') return '🇹🇰';
    if(code === 'TL') return '🇹🇱';
    if(code === 'TM') return '🇹🇲';
    if(code === 'TN') return '🇹🇳';
    if(code === 'TO') return '🇹🇴';
    if(code === 'TR') return '🇹🇷';
    if(code === 'TT') return '🇹🇹';
    if(code === 'TV') return '🇹🇻';
    if(code === 'TW') return '🇹🇼';
    if(code === 'TZ') return '🇹🇿';
    if(code === 'UA') return '🇺🇦';
    if(code === 'UG') return '🇺🇬';
    if(code === 'UM') return '🇺🇲';
    if(code === 'US') return '🇺🇸';
    if(code === 'UY') return '🇺🇾';
    if(code === 'UZ') return '🇺🇿';
    if(code === 'VA') return '🇻🇦';
    if(code === 'VC') return '🇻🇨';
    if(code === 'VE') return '🇻🇪';
    if(code === 'VG') return '🇻🇬';
    if(code === 'VI') return '🇻🇮';
    if(code === 'VN') return '🇻🇳';
    if(code === 'VU') return '🇻🇺';
    if(code === 'WF') return '🇼🇫';
    if(code === 'WS') return '🇼🇸';
    if(code === 'XK') return '🇽🇰';
    if(code === 'YE') return '🇾🇪';
    if(code === 'YT') return '🇾🇹';
    if(code === 'ZA') return '🇿🇦';
    if(code === 'ZM') return '🇿🇲';
return '🏳';
}

