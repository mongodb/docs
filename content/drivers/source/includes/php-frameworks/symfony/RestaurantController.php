<?php

declare(strict_types=1);

namespace App\Controller;

use App\Document\Restaurant;
use Doctrine\ODM\MongoDB\DocumentManager;
use MongoDB\BSON\Regex;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RestaurantController extends AbstractController
{
    private DocumentManager $dm;
    private LoggerInterface $logger;

    public function __construct(DocumentManager $dm, LoggerInterface $logger)
    {
        $this->dm = $dm;
        $this->logger = $logger;
    }

    #[Route('/', name: 'restaurant_index', methods: ['GET'])]
    public function index(Request $request): Response
    {   
        return $this->render('restaurant/index.html.twig');
    }

    #[Route('/restaurant/browse', name: 'restaurant_browse', methods: ['GET'])]
    public function browse(Request $request): Response
    {
        $restaurantRepository = $this->dm->getRepository(Restaurant::class);
        $queryBuilder = $restaurantRepository->createQueryBuilder();

        $restaurants = $queryBuilder
                ->field('borough')->equals('Queens')
                ->field('name')->equals(new Regex('Moon', 'i'))
                ->getQuery()
                ->execute();

        return $this->render('restaurant/browse.html.twig', ['restaurants' => $restaurants]);
    }
}
