/*
Licensed to LinDB under one or more contributor
license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright
ownership. LinDB licenses this file to you under
the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { get, upperFirst, find, isEmpty } from 'lodash-es';
import { Chart } from 'chart.js';
import { LegendMode, Placement } from '../types';
import { format } from './chart.config';

const LegendHeader: React.FC<{ values: string[] }> = (props) => {
  const { values } = props;
  return (
    <div className="legend-table-header">
      <span className="legend-th-content no-pointer">{/*search input*/}</span>
      {values.map((key) => {
        const headerClass = classNames('legend-th-content', {
          order: false,
          desc: false,
        });

        return (
          <span
            key={key}
            className={headerClass}
            // onClick={() => handleSort(key)}
          >
            <span>{upperFirst(key)}</span>
          </span>
        );
      })}
    </div>
  );
};

const LegendItem: React.FC<{
  series: any;
  values: string[];
  chart: Chart | null;
}> = (props) => {
  const { series, values, chart } = props;
  const seriesDiv = useRef<HTMLDivElement>(null);
  const { borderColor, label, hidden, stats } = series;
  const seriesCls = classNames('legend-series', {
    fade: hidden,
  });
  return (
    <div className={seriesCls}>
      <span className="legend-series-key">
        <i className="legend-series-icon" style={{ backgroundColor: borderColor }} />
        <span className="legend-series-label">{label}</span>
      </span>
      {values.map((key: string) => (
        <span key={key} className="legend-series-value">
          {format(chart, get(stats, key, 0))}
        </span>
      ))}
    </div>
  );
};

export const Legend: React.FC<{ chart: any }> = (props) => {
  const { chart } = props;
  const mode = get(chart, 'options.legend.mode', LegendMode.List);
  if (!chart || mode === LegendMode.Hidden) {
    // if chart not exist or hidden legend, return
    return null;
  }
  const datasets = get(chart, 'data.datasets', []);
  const placement = get(chart, 'options.legend.placement', Placement.Bottom);
  const asTable = mode === LegendMode.Table;
  const toRight = placement === Placement.Right;
  const values = get(chart, 'options.legend.values', []);
  const legendCls = classNames('time-series-legend', {
    'as-table': asTable,
    'to-right': toRight,
  });
  const legendContentCls = classNames('legend-content', {
    table: asTable,
    active: find(datasets, { hidden: false }),
  });

  return (
    <div className={legendCls}>
      <div className={legendContentCls}>
        {asTable && !isEmpty(datasets) && <LegendHeader values={values} />}
        {datasets.map((series: any) => {
          return <LegendItem chart={chart} series={series} key={series.label} values={values} />;
        })}
      </div>
    </div>
  );
};
