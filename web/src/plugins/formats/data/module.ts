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
import { FormatRepositoryInst } from '@src/types';
import { BIN, Binary, SI } from './data';

FormatRepositoryInst.register(new Binary('bytes(IEC)', 'bytes', BIN, 'B', 1024))
  .register(new Binary('bytes(SI)', 'decbytes', SI, 'B', 1000))
  .register(new Binary('bits(IEC)', 'bits', BIN, 'b', 1024))
  .register(new Binary('bits(SI)', 'decbits', SI, 'b', 1000))
  .register(new Binary('kibibytes(IEC)', 'kbytes', BIN, 'B', 1024, 1))
  .register(new Binary('kibibytes(SI)', 'deckbytes', SI, 'B', 1000, 1))
  .register(new Binary('mebibytes(IEC)', 'mbytes', BIN, 'B', 1024, 2))
  .register(new Binary('mebibytes(SI)', 'decmbytes', SI, 'B', 1000, 2))
  .register(new Binary('gibibytes(IEC)', 'gbytes', BIN, 'B', 1024, 3))
  .register(new Binary('gibibytes(SI)', 'decgbytes', SI, 'B', 1000, 3))
  .register(new Binary('tebibytes(IEC)', 'tbytes', BIN, 'B', 1024, 4))
  .register(new Binary('tebibytes(SI)', 'dectbytes', SI, 'B', 1000, 4))
  .register(new Binary('pebibytes(IEC)', 'pbytes', BIN, 'B', 1024, 5))
  .register(new Binary('pebibytes(SI)', 'decpbytes', SI, 'B', 1000, 5));
