import { Image, Spin, Upload } from "antd";
import { useFileUpload } from "./api/fileUpload.request";
import {
    CloseOutlined,
    LoadingOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { RcFile } from "antd/es/upload";

export type TUploadedFile = {
    url: string;
    filename: string;
};

type TFileUpload = {
    defaultFile?: TUploadedFile;
    onChange?: (file?: TUploadedFile | null) => void;
};

export const FileUpload = ({ defaultFile, onChange }: TFileUpload) => {
    const { mutateAsync: upload, isPending } = useFileUpload();
    const [uploadedFile, setUploadedFile] = useState<TUploadedFile | null>(
        defaultFile ?? null
    );

    return uploadedFile ? (
        <div className="flex items-center gap-x-3 relative w-full">
            <div
                onClick={() => {
                    setUploadedFile(null);
                    onChange?.(null);
                }}
                className="absolute top-0 right-0 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white cursor-pointer"
            >
                <CloseOutlined />
            </div>
            <div className="w-20 h-20 overflow-hidden">
                <Image className="object-cover!" src={uploadedFile.url} />
            </div>
            <h1>{uploadedFile.filename}</h1>
        </div>
    ) : (
        <Upload
            customRequest={async ({ file }) => {
                const res = await upload(file as RcFile);
                setUploadedFile(res);
                onChange?.(res);
                return res;
            }}
            showUploadList={false}
        >
            {isPending ? (
                <Spin indicator={<LoadingOutlined spin />} spinning />
            ) : (
                <div className="h-24 flex flex-col text-md items-center justify-center border border-dashed rounded-md cursor-pointer">
                    <div className="text-2xl">
                        <UploadOutlined />
                    </div>
                    <h2>upload file</h2>
                </div>
            )}
        </Upload>
    );
};
