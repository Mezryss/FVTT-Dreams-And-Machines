/**
 * Build a shared font definition structure.
 *
 * @param path {string} Path to the font file, including extension, within the assets/fonts/ folder.
 * @param style {'normal'|'italic'} Font Style
 * @param weight {string} Font weights
 */
function buildDefinition(path, style = 'normal', weight = '400') {
	return {
		urls: [`systems/dreams-and-machines/fonts/${ path }`],
		style,
		weight,
	};
}

/**
 * Registers all fonts used by the system so that they are available in the text editor.
 */
export function register() {
	CONFIG.fontDefinitions['Roboto Flex'] = {
		editor: true,
		fonts: [
			buildDefinition('RobotoFlex/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf', 'normal', '100 1000'),
			buildDefinition('RobotoFlex/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf', 'italic', '100 1000'),
		],
	};
}
