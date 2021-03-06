import 'babel-polyfill';

//TODO: Expand and/or move to a shared module
let supportedItems = [
  {
    name: 'Variable Declaration',
    value: 'VariableDeclaration',
    token: 'var'
  },
  {
    name: 'For Loop',
    value: 'ForStatement',
    token: 'for'
  },
  {
    name: 'While Loop',
    value: 'WhileStatement',
    token: 'while'
  },
  {
    name: 'If Statement',
    value: 'IfStatement',
    token: 'if'
  }
];

let defaultState = {
  whitelist: [],
  blacklist: [],
  structure: {
    options: [],
    first: "none",
    second: "none"
  },
  text: "//Please type your code here",
  errors: []
};

function generateList(){
  return supportedItems.map(item => {
    item = Object.assign({}, item);
    item.checked = false;
    item.disabled = false;
    return item;
  });
}

defaultState.whitelist = generateList();
defaultState.blacklist = generateList();

defaultState.structure.options.push(supportedItems.slice(1)); //Remove "var" from the list
defaultState.structure.options.push(supportedItems.slice());

function createNewLists(state){
  state.whitelist = state.whitelist.slice();
  state.blacklist = state.blacklist.slice();
}
function updateLists(list, otherList, checked, key){
  list[key].checked = checked;
  otherList[key].disabled = checked;
}

export default function config(state = defaultState, action) {
  switch (action.type) {
    case 'WHITELIST_UPDATE':
      createNewLists(state);
      updateLists(state.whitelist, state.blacklist, action.checked, action.key);
      return state;
    case 'BLACKLIST_UPDATE':
      createNewLists(state);
      updateLists(state.blacklist, state.whitelist, action.checked, action.key);
      return state;
    case 'CONFIG_UPDATE':
      state.structure[action.source] = action.value;
      if(action.source === 'first' && action.value === 'none'){
        state.structure['second'] = 'none';
      }
      return state;
    case 'TEXT_UPDATE':
      state.text = action.text;
      return state;
    case 'TEXT_VALIDATION':
      state.errors = action.errors;
      return state;
    default:
      return state;
  }
}
