const createNode = (data = '', left = '', right = '') => {
  const node = {
    data,
    left,
    right,
  };
  return node;
};

const Tree = (arr = []) => {
  const tree = {
    root: null,
  };

  return tree;
};

const buildTree = (arr, start = 0, end = arr.length - 1) => {
  //sort the array first
  arr = removeDuplicates(sort(arr));
  //   base case
  if (start > end) return null;
  //   get the middle index of the array
  const mid = parseInt((start + end) / 2);

  // create a node based on the index of the array;
  const root = createNode(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
};

// A function that prints the tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const sort = (arr) => {
  return arr.sort((a, b) => a - b);
};

const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

const getArrayValues = (node, arr = []) => {
  if (node !== null) {
    arr.push(node.data);
    getArrayValues(node.left, arr);
    getArrayValues(node.right, arr);

    return arr;
  }
};

const insert = (tree, value) => {
  let array = getArrayValues(tree);
  array.push(value);
  array = sort(removeDuplicates(array));
  return buildTree(array);
};

const remove = (tree, value) => {
  let array = getArrayValues(tree);
  array.splice(array.indexOf(value), 0);
  array = sort(removeDuplicates(array));
  return buildTree(array);
};

const find = (tree, value) => {
  // base case if the value exists
  if (tree !== null) {
    if (tree.data === value) return tree;

    // I was not returning the values if they were found
    const leftResult = find(tree.left, value);
    if (leftResult) return leftResult;

    const rightResult = find(tree.right, value);
    if (rightResult) return rightResult;
  }
};

// TODO: a iteration(loop) version
const levelOrder = (tree, cb = null, arr = []) => {
  // traverse tree in a breadth first level
  // first return the level order array
  if (tree !== null) {
    if (tree.data && !arr.includes(tree.data)) {
      arr.push(tree.data);
      cb(tree.data);
    }

    if (tree.left !== null && tree.left.data && !arr.includes(tree.left.data)) {
      arr.push(tree.left.data);
      cb(tree.left.data);
    }

    if (
      tree.right !== null &&
      tree.right.data &&
      !arr.includes(tree.right.data)
    ) {
      arr.push(tree.right.data);
      cb(tree.right.data);
    }

    levelOrder(tree.left, cb, arr);
    levelOrder(tree.right, cb, arr);

    // return removeDuplicates(arr);
    return arr;
  }
};

const preOrder = (node, cb = null, arr = []) => {
  if (node !== null) {
    if (node.data !== '') {
      arr.push(node.data);
    }
    preOrder(node.left, cb, arr);
    preOrder(node.right, cb, arr);

    return arr;
  }
};

const inOrder = (node, cb = null, arr = []) => {
  if (node !== null) {
    inOrder(node.left, cb, arr);
    if (node.data !== '') {
      arr.push(node.data);
    }
    inOrder(node.right, cb, arr);

    return arr;
  }
};

const postOrder = (node, cb = null, arr = []) => {
  if (node !== null) {
    postOrder(node.left, cb, arr);
    postOrder(node.right, cb, arr);
    if (node.data !== '') {
      arr.push(node.data);
    }

    return arr;
  }
};

const height = (node) => {
  if (!node) return -1;
  return 1 + Math.max(height(node.left), height(node.right));
};

const depth = (tree, node) => {
  if (tree.data === node.data) {
    return 0;
  }
  const isNodePresentLeft = find(tree.left, node.data);
  const isNodePresentRight = find(tree.right, node.data);

  if (isNodePresentLeft) {
    return 1 + depth(tree.left, node);
  } else if (isNodePresentRight) {
    return 1 + depth(tree.right, node);
  }
};

const isBalanced = (tree) => {
  // get the height of the right tree
  // get the height of the left tree

  const leftHeight = height(tree.left);
  const rightHeight = height(tree.right);

  const balance = leftHeight - rightHeight <= 1 ? true : false;

  return balance;
};

const rebalance = (tree) => {};
// buildTree
// const testTree = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const testTree = buildTree([5, 10, 15, 20, 25, 45, 30, 35]);
// const testTree = buildTree([1, 2, 3, 4, 5]);
console.log(prettyPrint(testTree));
// // console.log(getArrayValues(testTree));
// console.log(preOrder(testTree));
// console.log(inOrder(testTree));
// console.log(postOrder(testTree));

// console.log('Depth 20: ' + height(testTree, 20));
// console.log('Depth 10: ' + height(testTree, 10));
// console.log('Depth 30: ' + height(testTree, 30));
// console.log('Depth 15: ' + height(testTree, 15));
// console.log('Depth 5: ' + height(testTree, 5));
// console.log('Depth 35: ' + height(testTree, 35));
// console.log('Depth 25: ' + height(testTree, 25));

const foundNode = find(testTree, 45);
// console.log('HEIGHT', height(foundNode));
console.log('DEPTH', depth(testTree, foundNode));
console.log(isBalanced(testTree));
// console.log(prettyPrint(insert(testTree, 0)));
// console.log(prettyPrint(remove(testTree, 0)));
// console.log(find(testTree, 4));
// const transformedTree = transformTree(testTree);
// levelOrder(testTree, print);
// console.log(transformedTree.length);
// console.log(transformedTree.shift());
// console.log(transformedTree);
// console.log(transformTree(testTree));

// find(testTree, 2);
// console.log(getNodeValue(testTree));
// console.log(prettyPrint(testTree));
// console.log(testTree);

// console.log(prettyPrint(testTree));
// console.log(getArrayValues(inOrder(testTree)));
// console.log(getArrayValues(postOrder(testTree)));

// TODO: write is balanced
