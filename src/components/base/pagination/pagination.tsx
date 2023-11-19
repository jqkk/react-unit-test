import { IconContext } from "react-icons";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import { Flex, styled } from "@kuma-ui/core";

import { arrayOf } from "~/utils";

interface PaginationProps {
  pageCount: number;
  currentCount: number;
  onCurrentCountChange: (pageCount: number) => void;
  boundaryCount?: number;
}

export const Pagination = ({
  pageCount,
  currentCount,
  onCurrentCountChange,
  boundaryCount = 5,
}: PaginationProps) => {
  const flatArray = arrayOf(pageCount).map((_, index) => index + 1);
  const splitArray = arrayOf(Math.ceil(flatArray.length / boundaryCount)).map(
    (_, index) =>
      flatArray.slice(index * boundaryCount, (index + 1) * boundaryCount)
  );
  const currentBoundaryIndex = splitArray.findIndex((item) =>
    item.includes(currentCount)
  );

  const hasPrevious = currentBoundaryIndex !== 0;
  const hasNext = currentBoundaryIndex !== splitArray.length - 1;

  const handleFirstButtonClick = () => {
    if (hasPrevious) {
      onCurrentCountChange(1);
    }
  };

  const handlePreviousButtonClick = () => {
    if (hasPrevious) {
      onCurrentCountChange(
        splitArray[currentBoundaryIndex - 1][boundaryCount - 1]
      );
    }
  };

  const handleLastButtonClick = () => {
    if (hasNext) {
      onCurrentCountChange(pageCount);
    }
  };

  const handleNextButtonClick = () => {
    if (hasNext) {
      onCurrentCountChange(splitArray[currentBoundaryIndex + 1][0]);
    }
  };

  const handleNumButtonClick = (num: number) => {
    onCurrentCountChange(num);
  };

  return (
    <Flex gap="4px">
      <ButtonContainer
        onClick={handleFirstButtonClick}
        role="button"
        data-testid="pagination-first-button"
        aria-disabled={!hasPrevious}
      >
        <IconContext.Provider
          value={{ size: "28px", color: hasPrevious ? "#A4A4A4" : "#F2F2F2" }}
        >
          <MdKeyboardDoubleArrowLeft />
        </IconContext.Provider>
      </ButtonContainer>
      <ButtonContainer
        onClick={handlePreviousButtonClick}
        data-testid="pagination-previous-button"
        aria-disabled={!hasPrevious}
      >
        <IconContext.Provider
          value={{ size: "28px", color: hasPrevious ? "#A4A4A4" : "#F2F2F2" }}
        >
          <MdKeyboardArrowLeft />
        </IconContext.Provider>
      </ButtonContainer>
      {(currentBoundaryIndex === -1
        ? []
        : splitArray[currentBoundaryIndex]
      ).map((number) => (
        <Flex
          padding="12px"
          fontWeight={currentCount === number ? 700 : 500}
          color={currentCount === number ? "#585858" : "#A4A4A4"}
          letterSpacing="-0.8px"
          justifyContent="center"
          alignItems="center"
          width="44px"
          cursor="pointer"
          key={number}
          role="button"
          onClick={() => {
            handleNumButtonClick(number);
          }}
        >
          <span
            data-testid={
              currentCount === number
                ? "pagination-current-number-button"
                : "pagination-number-button"
            }
          >
            {number}
          </span>
        </Flex>
      ))}
      <ButtonContainer
        onClick={handleNextButtonClick}
        role="button"
        data-testid="pagination-next-button"
        aria-disabled={!hasNext}
      >
        <IconContext.Provider
          value={{ size: "28px", color: hasNext ? "#A4A4A4" : "#F2F2F2" }}
        >
          <MdKeyboardArrowRight />
        </IconContext.Provider>
      </ButtonContainer>
      <ButtonContainer
        onClick={handleLastButtonClick}
        role="button"
        data-testid="pagination-last-button"
        aria-disabled={!hasNext}
      >
        <IconContext.Provider
          value={{ size: "28px", color: hasNext ? "#A4A4A4" : "#F2F2F2" }}
        >
          <MdKeyboardDoubleArrowRight />
        </IconContext.Provider>
      </ButtonContainer>
    </Flex>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px;
  cursor: pointer;
`;
