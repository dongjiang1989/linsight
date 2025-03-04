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
import { Feature, FeatureRepositoryInst } from '@src/types';
import EditUser from '@src/features/setting/user/EditUser';
import ListDataSource from '@src/features/setting/datasource/ListDataSource';
import EditDataSource from '@src/features/setting/datasource/EditDataSource';

FeatureRepositoryInst.register(new Feature('/setting/user/edit', EditUser))
  .register(new Feature('/setting/datasources', ListDataSource))
  .register(new Feature('/setting/datasource', EditDataSource));
