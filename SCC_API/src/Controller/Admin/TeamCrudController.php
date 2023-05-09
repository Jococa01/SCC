<?php

namespace App\Controller\Admin;

use App\Entity\Team;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;

class TeamCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Team::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
        ->setEntityLabelInPlural('Teams')
        ;
    }

    public function configureFields(string $pageName): iterable
    {
        yield Field::new('id')->hideOnForm();
        yield Field::new('name');
        yield Field::new('logo');
        yield Field::new('flag');
        // yield AssociationField::new('players')->setFormTypeOptions(['by_reference' => true])->hideOnForm();
        yield Field::new('ranking');
    }
}
