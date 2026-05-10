import { Module } from '@nestjs/common';
import { LeadsController } from './leads/leads.controller';
import { LeadsService } from './leads/leads.service';
import { DealsController } from './deals/deals.controller';
import { DealsService } from './deals/deals.service';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsService } from './contacts/contacts.service';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesService } from './companies/companies.service';
import { PipelinesController } from './pipelines/pipelines.controller';
import { PipelinesService } from './pipelines/pipelines.service';
import { ActivitiesController } from './activities/activities.controller';
import { ActivitiesService } from './activities/activities.service';

@Module({
  controllers: [LeadsController, DealsController, ContactsController, CompaniesController, PipelinesController, ActivitiesController],
  providers: [LeadsService, DealsService, ContactsService, CompaniesService, PipelinesService, ActivitiesService],
  exports: [LeadsService, DealsService, ContactsService, CompaniesService, PipelinesService, ActivitiesService],
})
export class CrmModule {}
