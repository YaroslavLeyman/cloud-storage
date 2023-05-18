import React, { MouseEvent } from "react";
import styles from "./FileList.module.scss";
import { FileItem } from "@/api/dto/files.dto";
import { FileCard } from "@/components/FileCard";

export type FileSelectType = "select" | "unselect";

interface FileListProps {
  items: FileItem[];
  onFileSelect: (id: number, type: FileSelectType) => void;
}

export const FileList: React.FC<FileListProps> = ({ items, onFileSelect }) => {
  
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const id = target.dataset.id;
    if(!id) return;
    const active = target.classList.contains("active");
    target.classList.toggle("active");
    onFileSelect(Number(id), active ? "unselect" : "select");
  }

  return (
    <div className={styles.root}>
      {items.map((item) => (
        <div data-id={item.id} key={item.id} className="file" onClick={handleClick}>
          <FileCard filename={item.filename} originalName={item.originalName} />
        </div>
      ))}
    </div>
  );
};
