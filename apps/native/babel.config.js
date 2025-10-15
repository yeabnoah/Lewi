module.exports = (api) => {
	api.cache(true);
	const plugins = [
		// "module-resolver",
		// {
		// 	alias: {
		// 		"better-auth/react": "./node_modules/better-auth/dist/client/react/index.cjs",
		// 		"better-auth/client/plugins": "./node_modules/better-auth/dist/client/plugins/index.cjs",
		// 		"@better-auth/expo/client": "./node_modules/@better-auth/expo/dist/client.cjs",
		// 	},
		// },
	]

	plugins.push("react-native-worklets/plugin");

	return {
		presets: [
			["babel-preset-expo", { jsxImportSource: "nativewind" }],
			"nativewind/babel",
		],
		plugins,
	};
};
