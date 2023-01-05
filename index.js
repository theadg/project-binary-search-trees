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
  //
  arr = removeDuplicates(sort(arr));
  if (start > end) return null;
  const mid = parseInt((start + end) / 2);

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
// Test code
// createNode
// const testNode = createNode(5);
// console.log(testNode);

// buildTree
const testTree = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// console.log(prettyPrint(testTree));
console.log(testTree);
