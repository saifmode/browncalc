export const state = () => ({
	helpText: '',
});

export const mutations = {
	setHelpText(state, payload) {
		state.helpText = payload;
	},
};

export const actions = {
	updateHelpText({ commit }, payload) {
		commit('setHelpText', payload);
	},
};

export const getters = {
	helpText: (state) => state.helpText,
};