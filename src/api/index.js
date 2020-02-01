import request from '../utils/request';

export async function fetchData(params){
    return request({
        url: './get.json',
        method: 'get',
        params: params
    });
}
