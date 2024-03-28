import type {Meta, StoryObj} from "@storybook/react";
import {Popconfirm} from ".";

const meta: Meta<typeof Popconfirm> = {
  title: "Components/Button",
  component: Popconfirm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Sono un popconfirm!"
  }
}