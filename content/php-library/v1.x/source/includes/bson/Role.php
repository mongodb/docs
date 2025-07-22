<?php

namespace Bson;

// start-backed-enum
enum Role: int
{
    case USER = 1;
    case ADMIN = 2;
}
// end-backed-enum
