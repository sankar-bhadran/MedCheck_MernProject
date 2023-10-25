import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales"],
  ["2014", 1000],
  ["2015", 1170],
  ["2016", 660],
  ["2017", 1030],
];

export const options = {
  chart: {
    title: "Sales Performance",
    subtitle: "Sales: 2014-2017",
  },
};

export default function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
