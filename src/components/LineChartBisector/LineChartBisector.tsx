import React, { useEffect, useCallback } from "react";
import * as d3 from "d3";
import { Types } from "../../widgets/LineChartBisectorWidget/types";
import LineChartHelper from "./LineChartHelper";

const LineChartBisector = (props: ILineChartProps) => {
  const memoizedUpdateCallback = useCallback(() => {
    const scales = LineChartHelper.getScales(
      props.data,
      props.dimensions.boundedWidth,
      props.dimensions.boundedHeight,
      props.propertiesNames
    );
    const bounds = d3.select("#bounds");

    const helper = new LineChartHelper(props.propertiesNames);

    // draw chart
    const linesGenerator = d3
      .line()
      .x((d) => scales.xScale(helper.xAccessor(d)))
      .y((d) => scales.yScale(helper.yAccessor(d)));

    d3.select("#path")
      .attr("fill", "none")
      .attr("stroke", "#2EBD85")
      .attr("d", linesGenerator(props.data));

    // Peripherals

    // yAxis
    const yAxisGenerator = d3.axisLeft(scales.yScale);
    bounds.select("#y-axis").call(yAxisGenerator);

    // xAxis
    const xAxisGenerator = d3.axisBottom(scales.xScale);
    bounds
      .select("#x-axis")
      .call(xAxisGenerator)
      .style("transform", `translateY(${props.dimensions.boundedHeight}px)`);

    const bisect = d3.bisector((d) => {
      return d.x;
    }).left;

    const focus = bounds
      .append("g")
      .append("circle")
      .style("fill", "#2EBD85")
      .attr("stroke", "none")
      .attr("r", 8.5)
      .style("opacity", 0);

    const focusText = bounds
      .append("g")
      .append("text")
      .attr("fill", "white")
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle");

    bounds
      .append("rect")
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("width", props.dimensions.width)
      .attr("height", props.dimensions.height)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout);

    function mouseover() {
      focus.style("opacity", 1);
      focusText.style("opacity", 1);
    }

    function mousemove(event: React.MouseEvent) {
      const x0 = scales.xScale.invert(d3.pointer(event)[0]);
      const i = bisect(props.data, x0, 1);
      const selectedData = props.data[i];
      focus
        .attr("cx", scales.xScale(selectedData.x))
        .attr("cy", scales.yScale(selectedData.y));
      focusText
        .html(`x:${selectedData.x}  -  y:${selectedData.y}`)
        .attr("x", scales.xScale(selectedData.x) + 15)
        .attr("y", scales.yScale(selectedData.y));
    }
    function mouseout() {
      focus.style("opacity", 0);
      focusText.style("opacity", 0);
    }
  }, [props.data, props.dimensions, props.propertiesNames]);

  useEffect(() => {
    memoizedUpdateCallback();
  }, [memoizedUpdateCallback, props.data]);

  return (
    <div id="div">
      <svg
        id="wrapper"
        width={props.dimensions.width}
        height={props.dimensions.height}
      >
        <g
          id="bounds"
          style={{
            transform: `translate(${props.dimensions.margin.left}px, ${props.dimensions.margin.top}px)`,
          }}
        >
          <path id="path" />
          <g id="x-axis" />
          <g id="y-axis" />
        </g>
      </svg>
    </div>
  );
};

interface ILineChartProps {
  dimensions: Types.Dimensions;
  data: Types.Data[];
  propertiesNames: string[];
}

export default LineChartBisector;
