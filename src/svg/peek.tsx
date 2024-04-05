interface HTMLStyle {
	[key: string]: string | number
}

interface IPeek {
	border: string
	bg: string
	style?: HTMLStyle
	className?: string
	icon?: boolean
}

const Peek: React.FC<IPeek> = ({
	border,
	bg,
	style,
	className,
	icon = false,
}) => {
	return icon ? (
		<svg
			width="59"
			height="33"
			viewBox="0 0 59 33"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			style={style}
		>
			<g filter="url(#filter0_dd_1846_29759)">
				<path
					d="M1.21338 13.9531C1.21338 7.32571 6.58596 1.95312 13.2134 1.95312H34.1C38.3059 1.95312 42.0531 4.60946 43.4457 8.57812C47.4351 19.9472 50.5273 28.7593 54.113 38.9779C56.8514 46.7817 51.0608 54.9531 42.7906 54.9531H13.2134C6.58596 54.9531 1.21338 49.5805 1.21338 42.9531V13.9531Z"
					className={bg}
				/>
				<path
					d="M1.21338 13.9531C1.21338 7.32571 6.58596 1.95312 13.2134 1.95312H34.1C38.3059 1.95312 42.0531 4.60946 43.4457 8.57812C47.4351 19.9472 50.5273 28.7593 54.113 38.9779C56.8514 46.7817 51.0608 54.9531 42.7906 54.9531H13.2134C6.58596 54.9531 1.21338 49.5805 1.21338 42.9531V13.9531Z"
					className={border}
				/>
			</g>
			<defs>
				<filter
					id="filter0_dd_1846_29759"
					x="-2.28662"
					y="-0.546875"
					width="60.5869"
					height="60"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood
						flood-opacity="0"
						result="BackgroundImageFix"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="1" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1846_29759"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="1" />
					<feGaussianBlur stdDeviation="1.5" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_dropShadow_1846_29759"
						result="effect2_dropShadow_1846_29759"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect2_dropShadow_1846_29759"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	) : (
		<>
			<svg
				width="141"
				height="32"
				viewBox="0 0 141 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={className}
				style={style}
			>
				<g filter="url(#filter0_dd_1455_4230)">
					<path
						d="M1 13C1 6.37258 6.37258 1 13 1H98.6781C102.067 1 105.298 2.43291 107.573 4.94471C108.397 5.85459 109.205 6.74741 110 7.625C118.903 17.4555 126.075 25.3743 133.836 33.9436C140.822 41.6573 135.349 54 124.942 54H13C6.37259 54 1 48.6274 1 42V13Z"
						className={bg}
					/>
					<path
						d="M1 13C1 6.37258 6.37258 1 13 1H98.6781C102.067 1 105.298 2.43291 107.573 4.94471C108.397 5.85459 109.205 6.74741 110 7.625C118.903 17.4555 126.075 25.3743 133.836 33.9436C140.822 41.6573 135.349 54 124.942 54H13C6.37259 54 1 48.6274 1 42V13Z"
						className={border}
					/>
				</g>
				<defs>
					<filter
						id="filter0_dd_1455_4230"
						x="-2.5"
						y="-1.5"
						width="142.966"
						height="60"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood
							floodOpacity="0"
							result="BackgroundImageFix"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation="1" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_1455_4230"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation="1.5" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
						/>
						<feBlend
							mode="normal"
							in2="effect1_dropShadow_1455_4230"
							result="effect2_dropShadow_1455_4230"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect2_dropShadow_1455_4230"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>
		</>
	)
}

export default Peek
