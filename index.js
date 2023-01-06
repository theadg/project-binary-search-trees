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

// Test code
// createNode
// const testNode = createNode(5);
// console.log(testNode);

// buildTree
const testTree = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(prettyPrint(testTree));
// const testTree = buildTree([1, 2, 3, 4, 5]);
// console.log(getArrayValues(testTree));
console.log(preOrder(testTree));
console.log(inOrder(testTree));
console.log(postOrder(testTree));

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
