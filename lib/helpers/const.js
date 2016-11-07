const ActionTypes = {EXPORT: 'export', IMPORT: 'import'};
const ActionList = Object.keys(ActionTypes).map((key) => ActionTypes[key]);

module.exports = {
    ActionTypes: ActionTypes,
    ActionList: ActionList
};
