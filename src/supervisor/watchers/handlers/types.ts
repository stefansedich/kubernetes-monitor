import {
  KubernetesListObject,
  KubernetesObject,
  V1ListMeta,
  V1ObjectMeta,
  V1PodTemplateSpec,
} from '@kubernetes/client-node';
import { IncomingMessage } from 'http';

export const FALSY_WORKLOAD_NAME_MARKER = 'falsy workload name';

type WorkloadHandlerFunc = (workload: any) => Promise<void>;

type ListWorkloadFunctionFactory = (namespace: string) => () => Promise<{
  response: any;
  body: any;
}>;

export interface IWorkloadWatchMetadata {
  [workloadKind: string]: {
    endpoint: string;
    handlers: {
      [kubernetesInformerVerb: string]: WorkloadHandlerFunc;
    };
    listFactory: ListWorkloadFunctionFactory;
  };
}

export class V1DeploymentConfigList
  implements KubernetesListObject<V1DeploymentConfig>
{
  'apiVersion'?: string;
  'items': Array<V1DeploymentConfig>;
  'kind'?: string;
  'metadata'?: V1ListMeta;
}

export interface V1DeploymentConfig extends KubernetesObject {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1DeploymentConfigSpec;
  status?: V1DeploymentConfigStatus;
}

export interface V1DeploymentConfigSpec {
  template: V1PodTemplateSpec;
}

export interface V1DeploymentConfigStatus {
  observedGeneration?: number;
}

export type V1NamespacedList<T> = (
  namespace: string,
  pretty?: string,
  allowWatchBookmarks?: boolean,
  _continue?: string,
  fieldSelector?: string,
  labelSelector?: string,
  limit?: number,
  resourceVersion?: string,
  resourceVersionMatch?: string,
  timeoutSeconds?: number,
  watch?: boolean,
  options?: {
    headers: {
      [name: string]: string;
    };
  },
) => Promise<{
  response: IncomingMessage;
  body: T;
}>;
