import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	// общее состояние окна
	const [isOpen, setIsOpen] = useState(false);
	const toggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	const sideBarRef = useRef<HTMLElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: sideBarRef as React.RefObject<HTMLDivElement>,
		onChange: setIsOpen,
	});

	// состояние параметров
	const [selectedFont, setFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontColor, setFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setbackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setcontentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [selectedFontSizeOption, setfontSizeOption] = useState(
		defaultArticleState.fontSizeOption
	);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onApply({
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSizeOption,
		});
	};

	const handleReset = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setbackgroundColor(defaultArticleState.backgroundColor);
		setcontentWidth(defaultArticleState.contentWidth);
		setfontSizeOption(defaultArticleState.fontSizeOption);

		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				ref={sideBarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase={true}>
						{' Задайте параметры '}
					</Text>
					<Select
						selected={selectedFont}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={setFont}
					/>
					<RadioGroup
						title={'размер шрифта'}
						name={'размер шрифта'}
						options={fontSizeOptions}
						selected={selectedFontSizeOption}
						onChange={setfontSizeOption}
					/>

					<Select
						selected={selectedFontColor}
						options={fontColors}
						title={'цвет шрифта'}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						options={backgroundColors}
						title={'цвет фона'}
						onChange={setbackgroundColor}
					/>
					<Select
						selected={selectedContentWidth}
						options={contentWidthArr}
						title={'ширина контента'}
						onChange={setcontentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
