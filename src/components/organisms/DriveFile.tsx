import FileTypes from "@/constants/FileTypes"
import UnsupportedFileIcon from "@/svg/unsupportedFile"
import { TCodeFileExt, TDocumentFileType, TVideoFileType } from "@/types/file"
import { IDriveFile, THierarchyType } from "@/types/hierarchy"
import {
	ArrowDownTrayIcon,
	EyeIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid"
import Editor from "@monaco-editor/react"
import { formatRelative } from "date-fns"
import { useTheme } from "next-themes"
import Image from "next/image"
import { usePostHog } from "posthog-js/react"
import { useEffect, useState } from "react"
import { DefaultExtensionType, defaultStyles, FileIcon } from "react-file-icon"
import Loading from "../atoms/Loading"
import { Button } from "../ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer"

interface IDriveFileProps {
	file: IDriveFile
	hierarchy: { _id: string; title: string; priority?: number }
	hierarchyType: THierarchyType
}

const DriveFile: React.FC<IDriveFileProps> = ({
	file,
	hierarchy,
	hierarchyType,
}) => {
	const [fileData, setFileData] = useState<{
		name: string
		data: string
	} | null>(null)

	const { theme } = useTheme()

	const posthog = usePostHog()

	const fileExt = file.title.split(".").pop()

	const isImage = file.fileType?.includes("image")
	const isDocument = FileTypes.document.includes(fileExt as TDocumentFileType)
	const isVideo = FileTypes.video.includes(fileExt as TVideoFileType)
	const isCode = FileTypes.code.find(f =>
		f.ext.includes(fileExt as TCodeFileExt)
	)
	const isPDF = fileExt === "pdf"

	const fileIconStyles = defaultStyles[fileExt as DefaultExtensionType]

	const handlePreview = () => {
		posthog.capture("file_interaction", {
			hierarchy: {
				type: hierarchyType,
				id: hierarchy?._id,
				title: hierarchy?.title,
				priority: hierarchy?.priority ?? null,
			},
			id: file._id,
			url: file.url,
			fileTitle: file.title,
			ext: fileExt,
			action: "preview",
		})
	}

	const downloadFile = async () => {
		posthog.capture("file_interaction", {
			hierarchy: {
				type: hierarchyType,
				id: hierarchy?._id,
				title: hierarchy?.title,
				priority: hierarchy?.priority ?? null,
			},
			id: file._id,
			url: file.url,
			fileTitle: file.title,
			ext: fileExt,
			action: "download",
		})
		try {
			const response = await fetch(file.url)
			const blob = await response.blob()

			const url = window.URL.createObjectURL(blob)
			const link = document.createElement("a")
			link.href = url
			link.download = file.title
			link.target = "_blank"
			link.click()
			// Clean up
			window.URL.revokeObjectURL(url)
		} catch (error) {
			posthog.capture("error", {
				error,
				from: "downloadFile",
			})
			console.debug(`🚀 ~ downloadFile ~ error:`, error)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			if (file.url && isCode) {
				const codeFileType = isCode
				try {
					const resp = await fetch(file.url)
					const data = await resp.text()
					setFileData({
						name: codeFileType.name,
						data,
					})
				} catch (error) {
					posthog.capture("error", {
						error,
						from: "fileDataError",
					})
					console.error("Error fetching file data:", error)
				}
			}
		}
		fetchData()
	}, [file.url, isCode, posthog])

	return (
		<>
			<div className="relative flex items-center justify-between gap-4 rounded-md bg-gray-50 p-4 shadow ring-1 ring-inset ring-neutral-200 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-500/20">
				<div className="flex flex-1 items-center gap-4 truncate">
					<div className="mb-1.5 h-8 min-h-8 w-8 min-w-8 text-slate-400">
						<FileIcon
							extension={fileExt}
							{...fileIconStyles}
						/>
					</div>
					<div className="5 flex flex-col gap-1">
						<p className="truncate text-sm">{file.title}</p>
						<p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
							{formatRelative(
								new Date(),
								new Date(file.updatedAt)
							)}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon"
						onClick={downloadFile}
					>
						<ArrowDownTrayIcon className="h-4 w-4 shrink-0" />
					</Button>
					<Drawer>
						<DrawerTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								onClick={handlePreview}
							>
								<EyeIcon className="h-4 w-4 shrink-0" />
							</Button>
						</DrawerTrigger>
						<DrawerContent className="inset-x-0 bottom-0 mx-auto h-5/6 max-w-md rounded-md after:!h-[unset] md:my-4">
							<div className="relative flex h-full w-full flex-col gap-4 p-4">
								<DrawerHeader className="flex items-center justify-between gap-4 p-0">
									<div className="flex flex-col gap-1">
										<DrawerTitle>{file.title}</DrawerTitle>
										<DrawerDescription className="text-xs">
											{formatRelative(
												new Date(),
												new Date(file.updatedAt)
											)}
										</DrawerDescription>
									</div>
									<DrawerClose asChild>
										<Button
											variant="outline"
											size="icon"
										>
											<XMarkIcon className="h-4 w-4" />
										</Button>
									</DrawerClose>
								</DrawerHeader>
								<div className="relative flex-1">
									{isImage ? (
										<Image
											src={file.url}
											alt={file.title}
											fill
											priority
											className="rounded-md object-contain"
										/>
									) : isDocument ? (
										<div className="relative flex h-full w-full items-center justify-center">
											<Loading icon />
											<iframe
												src={
													isPDF
														? "https://docs.google.com/gview?url=" +
															file.url +
															"&embedded=true"
														: `https://view.officeapps.live.com/op/embed.aspx?src=${file.url}`
												}
												frameBorder="0"
												title={file.title}
												className="absolute inset-0 h-full w-full overflow-hidden rounded-md"
											/>
											{isPDF ? (
												<div className="absolute right-3 top-3 h-10 w-10 cursor-not-allowed bg-transparent" />
											) : (
												<>
													<div className="absolute bottom-0 left-0 h-6 w-11 cursor-not-allowed bg-transparent" />
													<div className="absolute bottom-0 right-11 h-6 w-11 cursor-not-allowed bg-transparent" />
												</>
											)}
										</div>
									) : isVideo ? (
										<div className="flex h-full w-full items-center justify-center">
											<video
												controls
												className="aspect-video w-full"
											>
												<source
													src={file.url}
													type={
														file.fileType ??
														"video/mp4"
													}
												/>
												Your browser does not support
												the video element.
											</video>
										</div>
									) : isCode && fileData ? (
										<div className="flex h-full w-full items-center justify-center">
											<Editor
												theme={
													theme === "light"
														? "light"
														: "vs-dark"
												}
												height="100%"
												language={fileData.name}
												value={fileData.data}
												className="rounded-md p-2"
												options={{ readOnly: true }}
											/>
										</div>
									) : (
										<div className="flex h-full w-full flex-col items-center justify-center gap-y-6 p-4">
											<UnsupportedFileIcon />
											<p className="flex flex-col items-center justify-center gap-y-2 text-center">
												<span className="text-sm font-semibold leading-5 text-purple-600">
													.{fileExt} FILE TYPE NOT
													SUPPORTED
												</span>
												<span className="text-4xl font-extrabold leading-10">
													File preview not available
												</span>
												<span className="text-base leading-6 text-gray-500 dark:text-gray-400">
													But you may download the
													file to view it on your
													device.
												</span>
											</p>
											<Button
												onClick={downloadFile}
												className="gap-1"
											>
												<ArrowDownTrayIcon className="h-5 w-5" />
												<span>Download</span>
											</Button>
										</div>
									)}
								</div>
							</div>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
		</>
	)
}

export default DriveFile
