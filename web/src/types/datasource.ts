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
import { ComponentType } from 'react';
import { Plugin, Variable } from '@src/types';

export enum DatasourceCategory {
  Metric = 'metric',
  Log = 'log',
  Trace = 'trace',
}

export interface TimeRange {
  from?: string;
  to?: string;
}

export interface DataQuery {
  queries: Query[];
  range?: TimeRange;
}

export interface Query {
  datasource: { uid: string };
  request: any;
}

export interface DatasourceInstance {
  setting: DatasourceSetting;
  api: DatasourceAPI;
  plugin: DatasourcePlugin;
}

export interface DatasourceSetting {
  uid: string;
  name: string;
  type: string;
  category: DatasourceCategory;
  url: string;
}

export interface QueryEditorProps {
  datasource: DatasourceInstance;
}

export interface VariableEditorProps {
  variable: Variable;
  datasource: DatasourceInstance;
}

export interface DatasourcePluginComponents {
  SettingEditor?: ComponentType<any>;
  QueryEditor?: ComponentType<QueryEditorProps>;
  VariableEditor?: ComponentType<VariableEditorProps>;
}

export interface DatasourceConstructor {
  new (setting: DatasourceSetting): DatasourceAPI;
}

class DatasourcePlugin extends Plugin {
  components: DatasourcePluginComponents = {};

  constructor(
    public category: DatasourceCategory,
    name: string,
    type: string,
    description: string,
    public DSConstructor: DatasourceConstructor
  ) {
    super(name, type, description);
  }

  setSettingEditor(SettingEditor: ComponentType<any>): DatasourcePlugin {
    this.components.SettingEditor = SettingEditor;
    return this;
  }

  setQueryEditor(QueryEditor: ComponentType<any>): DatasourcePlugin {
    this.components.QueryEditor = QueryEditor;
    return this;
  }
  setVariableEditor(VariableEditor: ComponentType<any>): DatasourcePlugin {
    this.components.VariableEditor = VariableEditor;
    return this;
  }
}

abstract class DatasourceAPI {
  readonly setting: DatasourceSetting;

  constructor(setting: DatasourceSetting) {
    this.setting = setting;
  }

  abstract query(req: any, range?: TimeRange): any;

  abstract metaQuery(req: any, prefix?: string): Promise<string[]>;

  abstract test(): any;
}

class DatasourceRepository {
  private datasources: Map<string, DatasourcePlugin> = new Map<string, DatasourcePlugin>();

  public register(ds: DatasourcePlugin): DatasourceRepository {
    this.datasources.set(ds.Type, ds);
    return this;
  }

  public get(type: string): DatasourcePlugin | undefined {
    return this.datasources.get(type);
  }

  public getPlugins(): DatasourcePlugin[] {
    const rs: DatasourcePlugin[] = [];
    for (const ds of this.datasources.values()) {
      rs.push(ds);
    }
    return rs;
  }
}

export const DatasourceRepositoryInst = new DatasourceRepository();
export { DatasourcePlugin, DatasourceAPI };
