// This is a draft for the recommendation system
// using matrix factorization algorithm.

// load math.js (using node.js)
var math = require('mathjs');

var num_user = 3;
var num_comp = 5;
// This is the number implicit feature one assume to be
// between user and company, say around 5~100.
// For advanced implementation, one should take in to account
// the already known information about the user, and add that
// as a fixed implicit feature.
var num_implicit_feature = 5;

// This is the history of the match, stored as a matrix
// of size (#user , #company).
// 1 means like, 0 means dislike, -1 means unseen.
// This shall be replaced by the real history of the match
var History_R = math.matrix([[-1, 0, 1, -1, 0],[1, -1, 1, -1, -1],[1, 0, 1, 1, -1]]);


// We assume there are certain implicit factors, affecting the match
// These factor can be described by the user matrix V, and the company matrix W
// By matching V*W to close to match matrix History_R
// We can predict the unknown entries in the match matrix.

// Step 1:
// Create random user matrix V, and random company matrix W
// This only need to be done once.
ret = rand_init_VW(num_user, num_comp, num_implicit_feature);
V = ret[0];
W = ret[1];

print("Given the history of the match");
print(History_R);
print("Random Generated prediction:");
print(math.multiply(V,W));

// Step 2:
// Minimizing the L2 norm || History_R - VW ||^2
// using SGD on seperate element

// For optimization, Stochastic gradient descent needs a 
// step_size and # of iteration.
var step_size = 0.01
var num_iter = 2000


ret = optimize(num_iter, num_user, num_comp, step_size, History_R, V, W);
V=ret[0];
W=ret[1];
// Forming the recommendation matrix 
estimate_R = math.multiply(V,W);

print("after optimization");
print(estimate_R);


// Step 3. Query user with id m, the next recommendation
id = 1;
score = score(id, estimate_R, History_R );
// The unseen company score start from 1.
print("user");
print(id);
print("score");
print(score);
// We can then select the next company with the highest score. 


// Step 4. If obtain new data, go back to Step 2, but
// with less number of iteration.
// Could only iterate on the new data ( haven't implemented yet) 



//var clone = a.clone();
//print(clone);                               // [1, 4, 9, 16, 25]
//console.log();


function rand_init_VW(num_user, num_comp, num_implicit_feature){
	var V = math.random([num_user, num_implicit_feature]);
	var W = math.random([num_implicit_feature, num_comp]);
	return [V,W];
}


function optimize(num_iter, num_user, num_comp, step_size, History_R, V, W) {
	for (iter = 0; iter < num_iter; iter++) {
		for (i = 0; i < num_user; i++){
			for (j = 0; j < num_comp; j++){
				if (math.subset(History_R, math.index(i, j)) >= 0) {
					R_ij = History_R.subset( math.index(i, j));
					Vi = math.subset(V, math.index(i, math.range(0,num_implicit_feature)) );
					Wj = math.subset(W, math.index(math.range(0,num_implicit_feature), j) );
					estimate_R_ij = math.dot( math.squeeze(Vi),math.squeeze(Wj));

					dVi = math.multiply(math.multiply(2, R_ij - estimate_R_ij ), Wj);
					dWj = math.multiply(math.multiply(2, R_ij - estimate_R_ij ), Vi);
					dVi = math.multiply(step_size, dVi);
					dWj = math.multiply(step_size, dWj);
					Vi = math.add(Vi, math.transpose(dVi));
					Wj = math.add(Wj, math.transpose(dWj));
					V = math.subset( V, math.index(i, math.range(0,num_implicit_feature)), Vi);
					W = math.subset( W, math.index(math.range(0,num_implicit_feature), j), Wj);
				}

			}
		}
	}
	return [V,W];
}


function score(id, estimate_R, History_R ){
	m = id;
	estimate_R_m  = math.subset(estimate_R, math.index(m, math.range(0,num_comp)) );
	History_R_m  = math.subset(History_R, math.index(m, math.range(0,num_comp)) );
	score_vector = math.squeeze(math.subtract(estimate_R_m, History_R_m));
	return score_vector;
}

function print(value) {
	var precision = 14;
	console.log(math.format(value, precision));
}

