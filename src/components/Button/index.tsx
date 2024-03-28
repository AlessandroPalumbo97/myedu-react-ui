import {Button as NextButton, ButtonProps, Tooltip} from "@nextui-org/react";

export const Button = (props: ButtonProps, tooltipContent?: string) => (
  <div>
    <Tooltip
      isDisabled={!tooltipContent}
      content={tooltipContent}
    >
      <NextButton {...props} />
    </Tooltip>
  </div>
)