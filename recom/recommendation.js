// This is a draft for the recommendation system
// using matrix factorization algorithm.

// load math.js (using node.js)
var math = require('mathjs');

// This is the history of the match, stored as a matrix
// of size (#user , #company).
// 1 means like, 0 means dislike, -1 means unseen.
var num_user = 3;
var num_comp = 5;
var History_R = math.matrix([[-1, 0, 1, -1, 0],[1, -1, 1, -1, -1],[1, 0, 1, 1, -1]]);

// This is the number implicit feature one assume to be
// between user and company
var num_implicit_feature = 5;

// For optimization, Stochastic gradient descent needs a 
// step_size.
var step_size = 0.01

// We assume there are certain implicit factors, affecting the match
// These factor can be described by the user matrix V, and the company matrix W
// By matching V*W to close to match matrix History_R
// We can predict the unknown entries in the match matrix.

// Step 1:
// Create random user matrix V, and random company matrix W
var V = math.random([num_user, num_implicit_feature]);
var W = math.random([num_implicit_feature, num_comp]);

print("Given the history of the match");
print(History_R);
print("Random Generated:");
print(math.multiply(V,W));

// Step 2:
// Minimizing the L2 norm || History_R - VW ||^2
// using SGD on seperate element

var num_iter = 2000
for (iter = 0; iter < num_iter; iter++) { 
	for (i = 0; i < num_user; i++){
		for (j = 0; j < num_comp; j++){
			if (History_R.subset( math.index(i, j)) >= 0) {
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


print("after optimization");
estimate_R = math.multiply(V,W)
print(estimate_R);


// Step 3. Query user with id m, the next recommendation
m = 1;
estimate_R_m  = math.subset(estimate_R, math.index(m, math.range(0,num_comp)) );
History_R_m  = math.subset(History_R, math.index(m, math.range(0,num_comp)) );
score = math.squeeze(math.subtract(estimate_R_m, History_R_m));
// The unseen company score start from 1.
print("user");
print(m);
print("score");
print(score);
// We can then select the next company with the highest score. 


// Step 4. If obtain new data, go back to Step 2, but
// with less number of iteration.
// Could only iterate on the new data ( haven't implemented yet) 



//var clone = a.clone();
//print(clone);                               // [1, 4, 9, 16, 25]
//console.log();


function print(value) {
  var precision = 14;
  console.log(math.format(value, precision));
}

