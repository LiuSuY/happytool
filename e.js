



console.log(toSum([2, 7, 11, 15, 3], 14));

function toSum(arr, target) {
    // for(let i = 0 ; i < arr.length; i++) {
    //     for(let j = i+1; j < arr.length; j++) {
    //         if(arr[i]+arr[j] == target) {
    //             return [i,j];
    //         }
    //     }
    // }
    let map = new Map();
    for(let i = 0; i < arr.length; i++) {
        let res = target - arr[i];
        if(map.has(res)) {
            return [map.get(res),i];
        }
        map.set(arr[i],i)
    }
}