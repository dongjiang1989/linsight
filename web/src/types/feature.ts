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

export class Feature {
  darkLogo?: ComponentType;
  lightLogo?: ComponentType;

  constructor(public Route: string, public Component: ComponentType) {}

  setDarkLogo(dark: ComponentType): Feature {
    this.darkLogo = dark;
    return this;
  }

  setLightLogo(light: ComponentType): Feature {
    this.lightLogo = light;
    return this;
  }
}

class FeatureRepository {
  private featureMap: Map<string, Feature> = new Map<string, Feature>();
  private features: Feature[] = [];

  public register(feature: Feature): FeatureRepository {
    this.featureMap.set(feature.Route, feature);
    this.features.push(feature);
    return this;
  }

  public getFeature(path: string): Feature | undefined {
    return this.featureMap.get(path);
  }

  public getFeatures(): Feature[] {
    return this.features;
  }
}

export const FeatureRepositoryInst = new FeatureRepository();
