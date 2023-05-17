<?php

namespace App\Controller\Admin;

use App\Entity\Team;
use App\Repository\TeamRepository;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class TeamCrudController extends AbstractCrudController
{
    public $repository;

    public function __construct(TeamRepository $em){
        $this->repository = $em;
    }

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
        yield IntegerField::new('diff');
    }

    public function createEntity(string $entityFqcn)
    {
        $num = count($this->repository->findAll())+1;
        $product = new Team();
        $product->setId($num);
        $product->setLogo("def_logo");
        $product->setFlag("international");
        $product->setDiff(0);

        return $product;
    }
}
