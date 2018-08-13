import * as assert from 'assert';

import BaseProcessor from '../base';
import { iconDirectory } from '../../config';

describe('test BaseProcessor', () => {
	it('should generate processor class', () => {
		class TestProcessor extends BaseProcessor {
			constructor() {
				super();
				this.iconDirectory = iconDirectory;
				this.iconFileExtension = 'svg';
			}

			run() {}
		}

		const testProcessor = new TestProcessor();

		const iconNames = testProcessor.getIconNames();
		assert.notStrictEqual(
			iconNames.indexOf('social.regular.paperPlane'),
			-1,
		);

		const icons = testProcessor.getIcons();
		assert(typeof icons[0].source === 'string');

		testProcessor.run();
	});
});
