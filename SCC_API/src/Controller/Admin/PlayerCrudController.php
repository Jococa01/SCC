<?php

namespace App\Controller\Admin;

use App\Entity\Team;
use App\Entity\Player;
use App\Entity\Role;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class PlayerCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Player::class;
    }

    public function configureFields(string $pageName): iterable
    {
        yield Field::new('id')->hideOnForm();
        yield Field::new('nick');
        yield Field::new('name');
        yield AssociationField::new('team')->setFormTypeOptions(['by_reference' => true, "required"=>false]);
        yield AssociationField::new('Role')->setFormTypeOptions(['by_reference' => true]);
        // yield ArrayField::new('team')->hideOnForm();
        yield Field::new('flag');
        yield Field::new('photo');
        yield Field::new('age');
    }

    public function createEntity(string $entityFqcn)
    {
        // $num = count($this->repository->findAll())+1;
        $product = new Player();
        $product->setTeam(null);
        $product->setFlag("international");
        $product->setPhoto("default");

        return $product;
    }
}
