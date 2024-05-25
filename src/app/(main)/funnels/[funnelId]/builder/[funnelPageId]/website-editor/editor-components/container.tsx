"use client";
import { Badge } from "@/components/ui/badge";
import { EditorBtns, defaultStyles } from "@/lib/constants";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import React, { useRef } from "react";
import { v4 } from "uuid";
import Recursive from "./recursive";
import { Trash } from "lucide-react";

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOnDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    console.log(type, id);
    const componentInfo = e.dataTransfer.getData("componentType");

    //  For adding new elements from components tab
    if (componentInfo!.indexOf("add") != -1) {
      const componentType = componentInfo.split("-")[1];

      switch (componentType) {
        case "text":
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              index: undefined,
              currentIndex: undefined,
              containerId: id,
              elementDetails: {
                content: { innerText: "Text Element" },
                id: v4(),
                name: "Text",
                styles: {
                  color: "black",
                  ...defaultStyles,
                },
                type: "text",
              },
            },
          });
          break;
        case "link":
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              index: undefined,
              currentIndex: undefined,
              containerId: id,
              elementDetails: {
                content: {
                  innerText: "Link Element",
                  href: "#",
                },
                id: v4(),
                name: "Link",
                styles: {
                  color: "black",
                  ...defaultStyles,
                },
                type: "link",
              },
            },
          });
          break;
        case "video":
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              index: undefined,
              currentIndex: undefined,
              containerId: id,
              elementDetails: {
                content: {
                  src: "https://www.youtube.com/embed/jNc2855UwSM",
                },
                id: v4(),
                name: "Video",
                styles: {},
                type: "video",
              },
            },
          });
          break;
        case "container":
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              index: undefined,
              currentIndex: undefined,
              containerId: id,
              elementDetails: {
                content: [],
                id: v4(),
                name: "Container",
                styles: { ...defaultStyles },
                type: "container",
              },
            },
          });
          break;

        case "2Col":
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              index: undefined,
              currentIndex: undefined,
              containerId: id,
              elementDetails: {
                content: [
                  {
                    content: [],
                    id: v4(),
                    name: "Container",
                    styles: { ...defaultStyles, width: "100%" },
                    type: "container",
                  },
                  {
                    content: [],
                    id: v4(),
                    name: "Container",
                    styles: { ...defaultStyles, width: "100%" },
                    type: "container",
                  },
                ],
                id: v4(),
                name: "Two Columns",
                styles: { ...defaultStyles, display: "flex" },
                type: "2Col",
              },
            },
          });
          break;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleElementDrag = (
    e: React.DragEvent,
    activeElement: EditorElement
  ) => {
    e.stopPropagation();
    dispatch({
      type: "SET_DRAGGED_ELEMENT",
      payload: { draggedElement: activeElement },
    });
    // dispatch({
    //   type: "CHANGE_CLICKED_ELEMENT",
    //   payload: { elementDetails: activeElement },
    // });
  };

  const handleElementDrop = (e: React.DragEvent, index: number) => {
    e.stopPropagation();
    const draggedElement = state.editor.draggedElement;
    if (!draggedElement) return;

    const dropPositionY = e.clientY;
    if (!Array.isArray(content)) return;
    let targetIndex = content.length; // Default to adding at the end
    const container = containerRef.current;
    if (!container) return;
    // Loop through child elements to determine the drop index
    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i];
      const { bottom } = child.getBoundingClientRect();
      if (dropPositionY < bottom && child) {
        targetIndex = i - 1; // -1 for body element
        break;
      }
    }
    console.log(type, id, index, targetIndex, state.editor.elements);
    dispatch({
      type: "ADD_ELEMENT",
      payload: {
        containerId: id,
        elementDetails: draggedElement,
        index: targetIndex,
        currentIndex: index,
      },
    });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  /*  handleondrop will be called on which element the dragged element is dropped, 
  2 function will be needed fro targetindex calculation and other for moveing element 
  in which there will only be dispatch, and do same in handleonDrop as in elementdrop func */

  return (
    <div
      style={styles}
      className={clsx("relative p-4 transition-all group", {
        "max-w-full w-full": type === "container" || type === "2Col",
        "h-fit": type === "container",
        "h-full": type === "__body",
        "overflow-scroll ": type === "__body",
        "flex flex-col md:!flex-row": type === "2Col",
        "!border-blue-500":
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== "__body",
        "!border-yellow-400 !border-4":
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === "__body",
        "!border-solid":
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={handleDragOver}
      draggable={type !== "__body"}
      onClick={handleOnClickBody}
      data-id={id}
      ref={containerRef}
      onDragStart={(e) => handleDragStart(e, "container")}
    >
      <Badge
        className={clsx(
          "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          }
        )}
      >
        {element.name}
      </Badge>

      {Array.isArray(content) &&
        content.map((childElement, idx) => (
          <div
            key={childElement.id}
            draggable
            onDragStart={(e) => handleElementDrag(e, childElement)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={(e) => handleElementDrop(e, idx)}
            className="w-full"
          >
            <Recursive key={childElement.id} element={childElement} />
          </div>
        ))}

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== "__body" && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
            <Trash size={16} onClick={handleDeleteElement} />
          </div>
        )}
    </div>
  );
};

export default Container;
