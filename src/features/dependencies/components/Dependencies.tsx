import React, { useEffect, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "../../../styles";
import { Dependency } from "../../../common/models";
import { DependenciesItem } from "./DependenciesItem";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { dependencyPromoted } from "../../../features/requestedPackages";
import { ArrowIcon } from "../../../components";

export interface IDependenciesProps {
  /**
   * @param dependencies list of dependencies
   * @param mode change whether the component only displays the list or we are able to edit it
   * @param hasMore needed for infinite scroll, if this is true next function will be called
   * @param next handler which will be called when we scoll at the current bottom of the infinite scroll lists
   */
  dependencies: Dependency[];
  mode: "read-only" | "edit";
  hasMore: boolean;
  next?: () => void;
  maxWidth?: number;
}

export const Dependencies = ({
  mode,
  dependencies,
  hasMore,
  next = () => null,
  maxWidth = 420
}: IDependenciesProps) => {
  const dispatch = useAppDispatch();
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const listLength = dependencies.length;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [selectedEnvironment?.id]);

  return (
    <Accordion
      sx={{
        maxWidth,
        boxShadow: "none"
      }}
      disableGutters
      defaultExpanded
    >
      <StyledAccordionSummary expandIcon={<ArrowIcon />}>
        <StyledAccordionTitle sx={{ color: "primary.main" }}>
          Installed Packages{" "}
          <Tooltip
            title="Includes requested packages and their dependencies"
            tabIndex={0}
          >
            <InfoOutlinedIcon
              sx={{
                fontSize: "20px",
                verticalAlign: "top",
                color: "secondary.main"
              }}
            />
          </Tooltip>
        </StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        id="infScroll"
        sx={{ padding: 0, maxHeight: "300px" }}
        ref={scrollRef}
      >
        <InfiniteScroll
          hasMore={hasMore}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px"
              }}
            >
              <CircularProgress />
            </Box>
          }
          dataLength={listLength}
          next={next}
          scrollableTarget="infScroll"
          style={{ overflow: "hidden" }}
        >
          {dependencies.length ? (
            <TableContainer>
              <Table sx={{ width: "100%", tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "13px" }}>Package</TableCell>
                    <TableCell sx={{ fontSize: "13px", textAlign: "right" }}>
                      Installed Version
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dependencies.map((dependency, index) => (
                    <DependenciesItem
                      key={dependency.id}
                      sx={{
                        backgroundColor:
                          index % 2 ? "secondary.50" : "transparent"
                      }}
                      mode={mode}
                      dependency={dependency}
                      handleClick={() =>
                        dispatch(dependencyPromoted(dependency))
                      }
                      isLast={index === dependencies.length - 1}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "10px"
              }}
            >
              <CircularProgress size={20} />
            </Box>
          )}
        </InfiniteScroll>
      </StyledAccordionDetails>
    </Accordion>
  );
};
