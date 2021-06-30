export const state = () => ({
	helpText: '',
	waxed: true,
});

export const mutations = {
	setHelpText(state, payload) {
		state.helpText = payload;
	},
	setWaxed(state, payload) {
		state.waxed = payload;
	}
};

export const actions = {
	updateHelpText({ commit }, payload) {
		commit('setHelpText', payload);
	},
};

export const getters = {
	helpText: (state) => state.helpText,
	waxed: (state) => state.waxed,
};