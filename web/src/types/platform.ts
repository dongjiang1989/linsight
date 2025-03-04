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
import { DatasourceSetting } from './datasource';
import { Preference, User } from './user';
import { Chart } from 'chart.js';

export interface Bootdata {
  home?: string; // home page
  user: User;
  navTree: any;
  datasources: DatasourceSetting[];
  preference?: Preference;
}

export enum MouseEventType {
  Move = 'move',
  Out = 'out',
  Click = 'click',
}

export interface MouseEvent {
  type: MouseEventType;
  native: any;
  index?: any;
  chart?: Chart;
}
