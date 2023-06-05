import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'https://keycloak.homologacao.devsys.nic.br/',
      realm: 'devsysnic',
      clientId: 'service-tasks',
      secret: 'QUnbbFpuXljaz0gsxS76BfTknOe9KU7l',
      cookieKey: 'KEYCLOAK_JWT',
      //logLevels: ['verbose'],
      //useNestLogger: false,
      //policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      //tokenValidation: TokenValidation.ONLINE,
    };
  }
}
