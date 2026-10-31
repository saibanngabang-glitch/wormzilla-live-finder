import {AdapterResult,Platform} from '../types';
export function unsupported(platform:Platform):AdapterResult{return {state:'unsupported',streams:[],message:`${platform} public LIVE search is not integrated. Use external platform search.`}}
