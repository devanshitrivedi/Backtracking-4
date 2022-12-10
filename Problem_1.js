// Problem1: Optimal Placement of Buildings in a grid

// Time Complexity : (HW)^3
// Space Complexity : O(hw)
// Did this code successfully run on Leetcode : Yes
// Any problem you faced while coding this : No


// Your code here along with comments explaining your approach

// https://github.com/super30admin/Backtracking-4

// Problem1: Optimal Placement of Buildings in a grid
// Given a grid with w as width, h as height. Each cell of the grid represents a potential building lot and we will be adding "n" buildings inside this grid. The goal is for the furthest of all lots to be as near as possible to a building. Given an input n, which is the number of buildings to be placed in the lot, determine the building placement to minimize the distance the most distant empty lot is from the building. Movement is restricted to horizontal and vertical i.e. diagonal movement is not required.

// For example, w=4, h=4 and n=3. An optimal grid placement sets any lot within two unit distance of the building. The answer for this case is 2.

// "0" indicates optimal building placement and in this case the maximal value of all shortest distances to the closest building for each cell is "2".

// 1 0 1 2

// 2 1 2 1

// 1 0 1 0

// 2 1 2 1

class BuildingPlacement {
    constructor(w, h, n) {
        this.minimumdistance = Infinity;
        this.dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // U D L R
        this.w = w; // Columns
        this.h = h; // Rows
        this.n = n; // number of buildings to place
        this.grid = new Array(h);
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(w);
            this.grid[i].fill(-1);
        }
    }
    getResult() {
        this.placeBuildingsDfs(0, 0, this.n);
        return this.minimumdistance;
    }
    placeBuildingsDfs(row, col, buldingsLeft) {
        // Base
        if (buldingsLeft === 0) {
            this.findDistance();
            return;
        }
        if (col === this.w) {
            col = 0;
            row++;
        }

        // Logic
        for (let i = row; i < this.h; i++) {
            for (let j = col; j < this.w; j++) {
                this.grid[i][j] = 0;
                this.placeBuildingsDfs(row, j + 1, buldingsLeft - 1)
                this.grid[i][j] = -1;
            }
        }

    }
    findDistance() {
        let queue = [];
        let visited = new Array(this.h);
        for (let i = 0; i < visited.length; i++) {
            visited[i] = new Array(this.w);
            visited[i].fill(false);
        }
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                if (this.grid[i][j] === 0) {
                    visited[i][j] = true;
                    queue.push([i, j]);
                }
            }
        }
        // BFS to get levels
        let distance = 0;
        while (queue.length > 0) {
            let size = queue.length;
            for (let i = 0; i < size; i++) {
                const [row, col] = queue.shift();
                for (let i = 0; i < this.dirs.length; i++) {
                    let nr = row + this.dirs[i][0];
                    let nc = col + this.dirs[i][1];
                    if (nr >= 0 && nr < this.h && nc >= 0 && nc < this.w && !visited[nr][nc]) {
                        visited[nr][nc] = true;
                        queue.push([nr, nc]);
                    }
                }
            }
            distance++;
        }
        this.minimumdistance = Math.min(this.minimumdistance, distance - 1)
    }
}
(function () {
    let buildingPlacement = new BuildingPlacement(4, 4, 3);
    console.log(buildingPlacement.getResult());
})()