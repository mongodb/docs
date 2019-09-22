.. important:: 

   Starting in MongoDB 4.0, |cmd-name| takes a :serverstatus:`global
   exclusive (W) lock <locks>` and blocks other operations on the
   database *and* all its collections until it finishes.
