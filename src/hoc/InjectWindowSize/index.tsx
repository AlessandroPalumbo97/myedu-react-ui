import React, {useLayoutEffect, useState} from "react";

export type InjectWindowSizeType = {
  height: number,
  width: number,
  breakpointStep: string,
  isMobile: boolean,
  lessThan: () => boolean,
  lessThanEqual: () => boolean,
  moreThan: () => boolean,
  moreThanEqual: () => boolean,
  windowSize: any,
}

export const injectWindowSize =
  (WrappedComponent: React.ComponentType<any> | React.FunctionComponent<any>) =>
    (props: InjectWindowSizeType) => {
      const breakpointSteps = [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'xxl',
      ];

      const [size, setSize] = useState({
        width: 0,
        height: 0,
        breakpointStep: "lg",
        isMobile: false,
      });

      const {
        breakpointStep,
      } = size;

      useLayoutEffect(() => {
        function getBreakpointStep() {
          switch (true) {
            case (window.innerWidth < 576):
              return "xs";
            case (window.innerWidth < 768):
              return "sm";
            case (window.innerWidth < 992):
              return "md";
            case (window.innerWidth < 1200):
              return "lg";
            case (window.innerWidth < 1600):
              return "xl";
          }

          return "xxl";
        }

        function getIsMobile() {
          const bp = getBreakpointStep();
          switch (bp) {
            case "xs":
            case "sm":
            case "md":
              return true;
            case "lg":
            case "xl":
            case "xxl":
            default:
              return false;
          }
        }

        function updateSize() {
          setSize({
            width: window.innerWidth,
            height: window.innerHeight,
            breakpointStep: getBreakpointStep(),
            isMobile: getIsMobile(),
          });
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, []);

      const lessThan = (targetStep: string) => {
        for (const step of breakpointSteps) {
          switch (true) {
            case targetStep === step:
              return false;
            case breakpointStep === step:
              return true;
          }
        }

        return false;
      }

      const lessThanEqual = (targetStep: string) => {
        for (const step of breakpointSteps) {
          switch (true) {
            case breakpointStep === step:
              return true;
            case targetStep === step:
              return false;
          }
        }

        return false;
      }

      const moreThan = (targetStep: string) => {
        for (const step of breakpointSteps) {
          switch (true) {
            case targetStep === step && targetStep !== breakpointStep:
              return true;
            case breakpointStep === step:
              return false;
          }
        }

        return false;
      }

      const moreThanEqual = (targetStep: string) => {
        for (const step of breakpointSteps) {
          switch (true) {
            case targetStep === step:
              return true;
            case breakpointStep === step:
              return false;
          }
        }

        return false;
      }

      return (
        <WrappedComponent
          {...props}
          windowSize={{
            ...size,
            lessThan,
            lessThanEqual,
            moreThan,
            moreThanEqual,
          }}
        />
      );
    };
