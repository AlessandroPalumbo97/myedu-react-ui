import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button, Tooltip} from "@nextui-org/react";

export const Popconfirm = ({
   children,
   content,
   placement = "top",
   backdrop = "opaque",
   okText = "Si",
   onOk,
   cancelText = "No",
   onCancel = () => undefined,
   tooltipText = undefined,
   tooltipColor = "default",
 }: {
  children: React.ReactNode,
  content: any,
  placement?: "top" | "bottom" | "left" | "right",
  backdrop?: "opaque" | "blur" | "transparent",
  okText?: string | undefined,
  onOk: () => void,
  cancelText?: string,
  onCancel?: () => void,
  tooltipText?: string
  tooltipColor?: "default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined,
}) => {
  const selfClose = () => {
    const backdropDiv: HTMLElement = document.querySelector('div[data-slot="backdrop"]') as HTMLElement;
    if (backdropDiv) {
      backdropDiv.click();
    }
  }

  return (
    <Popover
      onClose={onCancel}
      backdrop={backdrop}
      placement={placement}
    >
      <Tooltip
        offset={-7}
        color={tooltipColor}
        isDisabled={!tooltipText}
        content={tooltipText}
      >
        <div className="w-full md:w-auto">
          <PopoverTrigger>
            {children}
          </PopoverTrigger>
        </div>
      </Tooltip>
      <PopoverContent>
        <div className="p-4">
          {content}
          <div className="flex flex-row justify-end gap-2 mt-4">
            <div>
              <Button
                className="p-0 m-0"
                size="sm"
                color="danger"
                onClick={() => {
                  onCancel();
                  selfClose();
                }}
              >
                {cancelText}
              </Button>
            </div>
            <div>
              <Button
                className="p-0 m-0"
                size="sm"
                color="secondary"
                onClick={() => {
                  onOk();
                  selfClose();
                }}
              >
                {okText}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

