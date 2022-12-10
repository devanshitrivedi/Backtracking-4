// Problem2: Word List Brace Expansion 
// https://leetcode.com/problems/brace-expansion/

/*
TC: O(k^n * nklogk)
    k is the avg length of each subblock
    n blocks
SC: O(n)
*/
// Did this code successfully run on Leetcode : Yes
// Any problem you faced while coding this : No


// Your code here along with comments explaining your approach

/*
TC: O(k^n * nklogk)
    k is the avg length of each subblock
    n blocks
SC: O(n)
*/

let result;
var dfs = (arr, idx, str) => {
    // Base Case
    if (idx > arr.length) {
        return;
    }
    if (idx === arr.length) {
        result.push(str);
        return;
    }

    // Logic
    for (let i = 0; i < arr[idx].length; i++) {
        // Action
        str += arr[idx][i];
        // Recurse
        dfs(arr, idx + 1, str);
        // Backtrack
        str = str.slice(0, -1);
    }
}
/**
 * @param {string} s
 * @return {string[]}
 */
var expand = function (s) {
    let arr = [];
    let temp = [];
    result = [];
    let str = "";
    // Structuring the input to array of arrays
    for (let i = 0; i < s.length; i++) {
        let ch = s[i];
        if (ch === "{") {
            if (str.length > 0) {
                arr.push([str]);
            }
            temp = [];
            str = "";
        } else if (ch === "}") {
            if (temp.length > 0) {
                arr.push(Array.from(temp));
            }
            temp = [];
            str = "";
        } else if (ch === ",") {
            continue;
        } else {
            temp.push(ch);
            str += ch;
        }
    }
    if (str.length > 0) {
        arr.push([str]);
    }
    // Sorting each subarray to make sure, result is in lexicographical order
    arr.forEach(tempArr => tempArr.sort());
    dfs(arr, 0, "");
    return result;
};